package br.com.aurum.backendCasos.models


import org.springframework.cloud.gcp.data.datastore.core.mapping.Entity
import org.springframework.data.annotation.Id
import java.time.LocalDateTime

@Entity
data class Caso(
        @Id
        var id : Long? = null,
        var pasta: String? = null,
        var clientes: String,
        var titulo: String,
        val etiqueta: Array<Etiqueta>,
        var descricao: String? = null,
        var observacoes: String? = null,
        var responsavel: String,
        var acesso: String? = null,
        var CreationDate: LocalDateTime = LocalDateTime.now()
)