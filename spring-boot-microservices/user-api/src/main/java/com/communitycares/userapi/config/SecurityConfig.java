package com.communitycares.userapi.config;

import com.communitycares.userapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    UserService userService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean("encoder")
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

//    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userService);
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/hello","/user/login", "/user/signup").permitAll()
                .antMatchers("/resource/**", "/user/add/resource", "/user/delete/resource").authenticated()
                .and()
                .httpBasic();

        http.cors();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.unmodifiableList(Arrays.asList("*")));
        configuration.setAllowedMethods(Collections.unmodifiableList(Arrays.asList("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH")));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Collections.unmodifiableList(Arrays.asList("Authorization", "Cache-Control", "Content-Type")));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}