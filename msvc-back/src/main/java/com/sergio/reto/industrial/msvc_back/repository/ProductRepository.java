package com.sergio.reto.industrial.msvc_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sergio.reto.industrial.msvc_back.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
