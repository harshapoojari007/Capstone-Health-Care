package com.graymatter.configurations;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;

//@EnableWebSecurity
@Configuration
public class SecurityConfigurations {

	//@Bean
//	public UserDetailsService getUserDetails() {
//		UserDetails admin=User.withUsername("harsha").password(encodePassword().encode( "harsha")).roles("admin").build();
//		UserDetails user1=User.withUsername("user1").password(encodePassword().encode("user@123")).roles("user").build();
//		UserDetails userDiag=User.withUsername("user2").password(encodePassword().encode("user@123")).roles("diag").build();
//
//		return new InMemoryUserDetailsManager(admin,user1,userDiag);
//	}
//		
//		
//	@Bean
//	public PasswordEncoder encodePassword() {
//		return new BCryptPasswordEncoder();
//	}
//	
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//		http.authorizeRequests(auth->auth
//		.requestMatchers("/login").permitAll()
//		.requestMatchers("/name/**").hasRole("diag")
//		.requestMatchers("/demo").hasAnyRole("admin","user")
//		.requestMatchers("/**").hasRole("admin")
//	     .anyRequest().authenticated())
//		.formLogin(form->form.loginPage("/login").loginProcessingUrl("/login").permitAll());
//		return http.build();
//		
//	}
		
	
}
