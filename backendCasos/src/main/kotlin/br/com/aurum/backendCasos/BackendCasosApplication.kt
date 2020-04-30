package br.com.aurum.backendCasos

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer

@SpringBootApplication
class BackendCasosApplication : SpringBootServletInitializer()

fun main(args: Array<String>) {
	runApplication<BackendCasosApplication>(*args)
}

