package org.opendatadiscovery.oddplatform.mapper;

import java.time.ZoneOffset;
import org.mapstruct.Mapper;
import org.opendatadiscovery.oddplatform.api.contract.model.Token;
import org.opendatadiscovery.oddplatform.dto.TokenDto;

@Mapper(config = MapperConfig.class)
public interface TokenMapper {
    default Token mapDtoToToken(final TokenDto dto) {
        if (dto == null || dto.tokenPojo() == null) {
            return null;
        }

        final String value = dto.showToken() ? dto.tokenPojo().getValue()
            : "******" + dto.tokenPojo().getValue().substring(dto.tokenPojo().getValue().length() - 6);

        return new Token()
            .id(dto.tokenPojo().getId())
            .value(value)
            .createdAt(dto.tokenPojo().getCreatedAt().atOffset(ZoneOffset.UTC))
            .createdBy(dto.tokenPojo().getCreatedBy())
            .updatedAt(dto.tokenPojo().getUpdatedAt().atOffset(ZoneOffset.UTC))
            .updatedBy(dto.tokenPojo().getUpdatedBy());
    }
}
