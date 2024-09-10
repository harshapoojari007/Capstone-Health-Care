package com.graymatter.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;

import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class DiagnosticCenter {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String contactNO;
    private String address;
    private String email;

    @JsonIgnore
    @OneToMany(mappedBy = "diagnosticCenter", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<DiagnosticTest> diagnosticTests=new ArrayList<DiagnosticTest>();

    @JsonIgnore
    @OneToMany(mappedBy = "diagnosticCenter", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Appointment> appointments=new ArrayList<Appointment>();
    
    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "centerAdmin_id")
    @JsonIgnore
    private CenterAdministrator centerAdmin;

}
