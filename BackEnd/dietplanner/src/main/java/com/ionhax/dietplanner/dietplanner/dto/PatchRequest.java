package com.ionhax.dietplanner.dietplanner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatchRequest {
    private String email;
    private String age;
    private String name;
}
