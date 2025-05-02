package com.sergio.reto.industrial.msvc_back.service;

import java.util.List;

import com.sergio.reto.industrial.msvc_back.entity.Product;

public interface ProductService {

    Product createProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);

}
