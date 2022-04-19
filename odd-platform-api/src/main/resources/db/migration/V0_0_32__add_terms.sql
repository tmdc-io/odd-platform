/*TODO add constraints*/

CREATE TABLE IF NOT EXISTS term
(
    id           bigserial PRIMARY KEY,
    name         varchar(255)                NOT NULL,
    definition   varchar                     NOT NULL,
    namespace_id bigint                      NOT NULL,
    created_at   timestamp without time zone NOT NULL DEFAULT NOW(),
    updated_at   timestamp without time zone NOT NULL DEFAULT NOW(),
    is_deleted   boolean                     NOT NULL DEFAULT FALSE,
    deleted_at   TIMESTAMP WITHOUT TIME ZONE,

    CONSTRAINT term_namespace_fk FOREIGN KEY (namespace_id) REFERENCES namespace (id)

);

CREATE TABLE IF NOT EXISTS tag_to_term
(
    tag_id  bigint NOT NULL,
    term_id bigint NOT NULL,

    CONSTRAINT tag_to_term_pk PRIMARY KEY (tag_id, term_id),

    CONSTRAINT tag_to_term_term_id_fkey FOREIGN KEY (term_id) REFERENCES term (id),
    CONSTRAINT tag_to_term_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES tag (id)
);

CREATE TABLE IF NOT EXISTS term_ownership
(
    term_id  bigint,
    owner_id bigint,
    role_id  bigint,

    CONSTRAINT term_ownership_pk PRIMARY KEY (term_id, owner_id),

    CONSTRAINT term_ownership_fk_term FOREIGN KEY (term_id) REFERENCES term (id),
    CONSTRAINT term_ownership_fk_owner FOREIGN KEY (owner_id) REFERENCES owner (id),
    CONSTRAINT term_ownership_fk_role FOREIGN KEY (role_id) REFERENCES role (id)
);

CREATE TABLE IF NOT EXISTS data_entity_to_term
(
    data_entity_id bigint,
    term_id        bigint,

    CONSTRAINT data_entity_to_term_pk PRIMARY KEY (data_entity_id, term_id),

    CONSTRAINT data_entity_to_term_term_id_fkey FOREIGN KEY (term_id) REFERENCES term (id),
    CONSTRAINT data_entity_to_term_data_entity_id_fkey FOREIGN KEY (data_entity_id) REFERENCES data_entity (id)
);