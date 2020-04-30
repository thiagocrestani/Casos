package br.com.aurum.backendCasos

import br.com.aurum.backendCasos.controller.CasoController
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class BackendCasosApplicationTests {
	@Autowired
	lateinit var casoController: CasoController

	@Test
	fun runController() {
		assertEquals("Hello from server",casoController.test());
	}

	@Test
	fun viewCaso() {
		assertEquals(1,casoController.view("4819281653006336").size);
	}

	@Test
	fun listPage() {
		assertEquals(5,casoController.list(0,5, null, null).Casos?.size);
	}

	@Test
	fun testFilter() {
		val filterType = Array<String>(1) { "daniel silva" }
		assertThat(casoController.list(0,5, "Clientes", filterType).Casos?.size).isGreaterThan(0);
	}

	@Test
	fun findByAccess() {
		val filterType = Array<String>(1) { "Privado" }
		assertThat(casoController.list(0,5, "Privado", filterType).Casos?.size).isGreaterThan(0);
	}

}
