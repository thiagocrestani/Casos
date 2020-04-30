package br.com.aurum.backendCasos.controller

import br.com.aurum.backendCasos.models.Caso
import br.com.aurum.backendCasos.models.PageDto
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.cloud.gcp.data.datastore.repository.query.Query
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.web.bind.annotation.*


interface CasoRepository : PagingAndSortingRepository<Caso, String> {
    fun findAllByClientes(clientes: String?, page: PageRequest): Page<Caso>

    fun findAllByAcesso(acesso: String?, page: PageRequest): Page<Caso>

    fun findAllById(id: Long): Array<Caso>

    @Query("select * from caso where CreationDate >= @dateFrom and CreationDate <= @dateUp")
    fun findDate(@Param("dateFrom") dateFrom: String, @Param("dateUp") dateUp: String, page: PageRequest): Page<Caso>

    @Query("select * from caso  where etiqueta contains @etiqueta")
    fun findEtiquetas(@Param("etiqueta") etiqueta: String, page: PageRequest): Page<Caso>

}

@RestController
class CasoController {


    @Autowired
    lateinit var casoRepository: CasoRepository


    @GetMapping
    @RequestMapping("/casos")
    @CrossOrigin
    fun list(@RequestParam(value = "page") page: Int,
             @RequestParam(value = "size") size: Int,
             @RequestParam(value = "filterType") filterType: String?,
             @RequestParam(value = "filter") filter: Array<String>?) : PageDto{
        var pageResponse : Page<Caso>? = null;
        var defaultSearch : Boolean = false;
        if(filterType == null  || filterType == "" || filter == null || filter.count() <= 0){
            defaultSearch = true
        }else if(filterType == "Clientes"  && filter[0] != ""){
            pageResponse = casoRepository.findAllByClientes(filter[0],PageRequest.of(page, size))
        }else if(filterType == "Acesso"  && filter[0] != ""){
            pageResponse = casoRepository.findAllByAcesso(filter[0],PageRequest.of(page, size))
        }else if(filterType == "Data") {
            var dateFrom = "1950-01-01T03:00:00Z"
            var dateUp = "2050-01-01T03:00:00Z"
            if(filter[0] != "") {
                dateFrom = filter[0] + "T03:00:00Z"
            }
            if(filter[1] != "") {
                dateUp = filter[1] + "T23:59:59Z"
            }
            pageResponse = casoRepository.findDate(dateFrom,dateUp,PageRequest.of(page, size))

        }else if(filterType == "Etiqueta"  && filter[0] != ""){
                pageResponse = casoRepository.findEtiquetas("Etiqueta(cor="+filter[0]+")",PageRequest.of(page, size));
        }else{
            defaultSearch = true
        }

        if(defaultSearch){
            pageResponse = casoRepository.findAll(PageRequest.of(page, size, Sort.by("CreationDate").descending()))
        }

        val pageDto = PageDto()
        pageDto.Casos = pageResponse?.toList();
        pageDto.totalPages = pageResponse?.totalPages;
        return pageDto;
    }


    @GetMapping
    @RequestMapping("/viewcaso")
    @CrossOrigin
    fun view(@RequestParam(value = "id") id: String): Array<Caso> {
        return casoRepository.findAllById(id.toLong())
    }


    @PostMapping
    @RequestMapping("/newcasos")
    @CrossOrigin
    fun saveMuch(@RequestBody casos: Iterable<Caso>) : String {
        var casosToInsert = mutableListOf<Caso>()
        var colors : List<String> = listOf("Vermelho", "Amarelo", "Azul", "Rosa", "Roxo", "Laranja", "Verde")
        var errors : Int = 0
        var error : Boolean = false
        for (caso in casos) {
            error = false
            if(caso.pasta != null && caso.pasta!!.length > 40){
                error = true
            }

            if(caso.clientes == "" || caso.clientes == null){
                error = true
            }


            if(caso.titulo == "" || caso.titulo == null){
                error = true
            }

            if(caso.responsavel == "" || caso.responsavel == null){
                error = true
            }

            if(caso.acesso != "Público" && caso.acesso != "Privado"){
                error = true
            }

            for (itemEtiqueta in caso.etiqueta) {
                if(!colors.contains(itemEtiqueta.cor)){
                    error = true
                }
            }

            if(!error) {
                casosToInsert.add(caso)
            }else{
                errors ++
            }
        }
        casoRepository.saveAll(casosToInsert)
        return casosToInsert.size.toString() + " Casos inserted with success, " + errors.toString() + " not inserted with error"
    }

    @PostMapping
    @RequestMapping("/caso")
    @CrossOrigin
    fun save(@RequestBody caso: Caso): Caso {
        return casoRepository.save(caso)
    }


    @PostMapping
    @RequestMapping("/newCaso")
    fun add(@RequestBody caso: Caso): Caso {
        return casoRepository.save(caso)
    }


    @RequestMapping("/test")
    @CrossOrigin
    fun test(): String {
        return "Hello from server"
    }
}





