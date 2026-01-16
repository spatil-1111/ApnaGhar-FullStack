package com.apnaghar.security;

import com.apnaghar.security.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth

                // ✅ Preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // 🔓 Auth
                .requestMatchers("/api/auth/**").permitAll()

                // 🔓 Swagger
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()

                // 🔓 PUBLIC PROPERTY APIs
                .requestMatchers(HttpMethod.GET, "/api/properties/**").permitAll()

                // 🔓 🔥 IMAGE ACCESS (THIS FIXES 403)
                .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/upload/**").permitAll()

                // 🔒 OWNER manages properties
                .requestMatchers(HttpMethod.POST, "/api/properties/**").hasRole("OWNER")
                .requestMatchers(HttpMethod.PUT, "/api/properties/**").hasRole("OWNER")
                .requestMatchers(HttpMethod.DELETE, "/api/properties/**").hasRole("OWNER")

                // 👤 USER bookings
                .requestMatchers(HttpMethod.POST, "/api/bookings/**").hasRole("USER")
                .requestMatchers(HttpMethod.GET, "/api/bookings/my").hasRole("USER")
                .requestMatchers(HttpMethod.PUT, "/api/bookings/cancel/**").hasRole("USER")

                // 🏠 OWNER bookings
                .requestMatchers(HttpMethod.GET, "/api/bookings/owner").hasRole("OWNER")
                .requestMatchers(HttpMethod.PUT, "/api/bookings/status/**").hasRole("OWNER")

                // 🛡 Admin
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                .anyRequest().authenticated()
            )

            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
