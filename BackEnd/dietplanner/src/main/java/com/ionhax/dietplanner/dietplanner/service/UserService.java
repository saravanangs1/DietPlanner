package com.ionhax.dietplanner.dietplanner.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.ionhax.dietplanner.dietplanner.dto.AuthRequest;
import com.ionhax.dietplanner.dietplanner.dto.AuthResponse;
import com.ionhax.dietplanner.dietplanner.dto.PatchRequest;
import com.ionhax.dietplanner.dietplanner.dto.UserDto;
import com.ionhax.dietplanner.dietplanner.entity.User;
import com.ionhax.dietplanner.dietplanner.entity.Enumerate.Role;
import com.ionhax.dietplanner.dietplanner.repository.UserRepository;
import com.ionhax.dietplanner.dietplanner.util.JwtUtil;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	@Autowired
	private UserRepository userRepository;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;

	public ResponseEntity<String> addUser(UserDto user) {
		Optional<User> isUserExists = userRepository.findByEmail(user.getEmail());

		if (isUserExists.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists");
		} else {
			User n = User.builder()
					.name(user.getName())
					.email(user.getEmail())
					.password(user.getPassword())
					.age(user.getAge())
					.role(Role.USER)
					.build();
			userRepository.save(n);
			return ResponseEntity.status(HttpStatus.OK).body("User saved successfully");
		}
	}

	public ResponseEntity<?> authUser(AuthRequest request) {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
		}
		var existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
		if (existingUser == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		var token = jwtUtil.generateToken(existingUser);
		return ResponseEntity.ok(AuthResponse.builder()
				.token(token)
				.age(existingUser.getAge())
				.name(existingUser.getName())
				.uid(existingUser.getUid())
				.email(existingUser.getEmail())
				.password(existingUser.getPassword())
				.build());
	}

	public ResponseEntity<?> updateUser(PatchRequest request) {
		try {
			User existingUser = userRepository.findByEmail(request.getEmail()).orElseThrow();
			if (existingUser == null) {
				return ResponseEntity.notFound().build();
			}
			existingUser.setName(request.getName());
			existingUser.setAge(request.getAge());
			userRepository.save(existingUser);
			return ResponseEntity.ok(existingUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
		}
	}

	public ResponseEntity<?> findByUserId(Long uid) {
		try {
			User existingUser = userRepository.findByUid(uid).orElseThrow();
			if (existingUser == null) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(existingUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Finding user");
		}
	}
}
