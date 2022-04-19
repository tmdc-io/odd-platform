package org.opendatadiscovery.oddplatform.controller;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.opendatadiscovery.oddplatform.api.contract.api.TermApi;
import org.opendatadiscovery.oddplatform.api.contract.model.CountableSearchFilter;
import org.opendatadiscovery.oddplatform.api.contract.model.DataEntityList;
import org.opendatadiscovery.oddplatform.api.contract.model.MultipleFacetType;
import org.opendatadiscovery.oddplatform.api.contract.model.TermDetails;
import org.opendatadiscovery.oddplatform.api.contract.model.TermFormData;
import org.opendatadiscovery.oddplatform.api.contract.model.TermList;
import org.opendatadiscovery.oddplatform.api.contract.model.TermRefList;
import org.opendatadiscovery.oddplatform.api.contract.model.TermSearchFacetsData;
import org.opendatadiscovery.oddplatform.api.contract.model.TermSearchFormData;
import org.opendatadiscovery.oddplatform.service.term.TermService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class TermController implements TermApi {

    private final TermService termService;

    @Override
    public Mono<ResponseEntity<TermRefList>> getTermsList(final Integer page, final Integer size,
                                                          final String query,
                                                          final ServerWebExchange exchange) {
        return termService.getTerms(page, size, query)
            .map(ResponseEntity::ok);
    }

    @Override
    public Mono<ResponseEntity<TermDetails>> createTerm(final Mono<TermFormData> termFormData,
                                                        final ServerWebExchange exchange) {
        return termFormData
            .flatMap(termService::createTerm)
            .map(ResponseEntity::ok);
    }

    @Override
    public Mono<ResponseEntity<TermDetails>> updateTerm(final Long termId, final Mono<TermFormData> termFormData,
                                                        final ServerWebExchange exchange) {
        return termFormData
            .flatMap(formData -> termService.updateTerm(termId, formData))
            .map(ResponseEntity::ok);
    }

    @Override
    public Mono<ResponseEntity<Void>> deleteTerm(final Long termId,
                                                 final ServerWebExchange exchange) {
        return termService.delete(termId)
            .map(ign -> ResponseEntity.noContent().build());
    }

    @Override
    public Mono<ResponseEntity<TermDetails>> getTermDetails(final Long termId,
                                                            final ServerWebExchange exchange) {
        return termService.getTermDetails(termId)
            .map(ResponseEntity::ok);
    }

    @Override
    public Mono<ResponseEntity<Flux<CountableSearchFilter>>> getTermFiltersForFacet(final UUID searchId,
                                                                                    final MultipleFacetType facetType,
                                                                                    final Integer page,
                                                                                    final Integer size,
                                                                                    final String query,
                                                                                    final ServerWebExchange exchange) {
        return TermApi.super.getTermFiltersForFacet(searchId, facetType, page, size, query, exchange);
    }

    @Override
    public Mono<ResponseEntity<DataEntityList>> getTermLinkedItems(final Long termId, final Integer page,
                                                                   final Integer size,
                                                                   final String query,
                                                                   final Long entityClassId,
                                                                   final ServerWebExchange exchange) {
        return TermApi.super.getTermLinkedItems(termId, page, size, query, entityClassId, exchange);
    }

    @Override
    public Mono<ResponseEntity<TermSearchFacetsData>> getTermSearchFacetList(final UUID searchId,
                                                                             final ServerWebExchange exchange) {
        return TermApi.super.getTermSearchFacetList(searchId, exchange);
    }

    @Override
    public Mono<ResponseEntity<TermList>> getTermSearchResults(final UUID searchId, final Integer page,
                                                               final Integer size,
                                                               final ServerWebExchange exchange) {
        return TermApi.super.getTermSearchResults(searchId, page, size, exchange);
    }

    @Override
    public Mono<ResponseEntity<TermRefList>> getTermSearchSuggestions(final String query,
                                                                      final ServerWebExchange exchange) {
        return TermApi.super.getTermSearchSuggestions(query, exchange);
    }

    @Override
    public Mono<ResponseEntity<TermSearchFacetsData>> termSearch(final Mono<TermSearchFormData> termSearchFormData,
                                                                 final ServerWebExchange exchange) {
        return TermApi.super.termSearch(termSearchFormData, exchange);
    }

    @Override
    public Mono<ResponseEntity<TermSearchFacetsData>> updateTermSearchFacets(
        final UUID searchId,
        final Mono<TermSearchFormData> termSearchFormData,
        final ServerWebExchange exchange) {
        return TermApi.super.updateTermSearchFacets(searchId, termSearchFormData, exchange);
    }
}