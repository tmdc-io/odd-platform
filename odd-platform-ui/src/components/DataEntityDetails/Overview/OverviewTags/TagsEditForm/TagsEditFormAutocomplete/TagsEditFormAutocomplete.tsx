import React from 'react';
import { Autocomplete, Typography } from '@mui/material';
import { Tag, TagFormData } from 'generated-sources';
import {
  AutocompleteInputChangeReason,
  createFilterOptions,
} from '@mui/material/useAutocomplete';
import { useAppDispatch } from 'lib/redux/hooks';
import { useDebouncedCallback } from 'use-debounce';
import AutocompleteSuggestion from 'components/shared/AutocompleteSuggestion/AutocompleteSuggestion';
import { OptionsContainer } from 'components/DataEntityDetails/Overview/OverviewTags/TagsEditForm/TagsEditFormStyles';
import ClearIcon from 'components/shared/Icons/ClearIcon';
import AppInput from 'components/shared/AppInput/AppInput';
import { fetchTagsList as searchTags } from 'redux/thunks';
import { UseFieldArrayAppend } from 'react-hook-form/dist/types/fieldArray';

interface TagsEditFormAutocompleteProps {
  append: UseFieldArrayAppend<TagFormData>;
}

const TagsEditFormAutocomplete: React.FC<
  TagsEditFormAutocompleteProps
> = ({ append }) => {
  const dispatch = useAppDispatch();

  type FilterOption = Omit<Tag, 'id'> & Partial<Tag>;
  const [options, setOptions] = React.useState<FilterOption[]>([]);
  const [autocompleteOpen, setAutocompleteOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');
  const filter = createFilterOptions<FilterOption>();

  const handleSearch = React.useCallback(
    useDebouncedCallback(() => {
      setLoading(true);
      dispatch(searchTags({ page: 1, size: 30, query: searchText }))
        .unwrap()
        .then(({ items }) => {
          setLoading(false);
          setOptions(items);
        });
    }, 500),
    [searchTags, setLoading, setOptions, searchText]
  );

  const getOptionLabel = React.useCallback(
    (option: FilterOption | string) => {
      if (typeof option === 'string') {
        return option;
      }
      if ('name' in option && option.name) {
        return option.name;
      }
      return '';
    },
    []
  );

  const getFilterOptions = React.useCallback(
    (filterOptions, params) => {
      const filtered = filter(options, params);
      if (
        searchText !== '' &&
        !loading &&
        !options.find(
          option =>
            option.name.toLocaleLowerCase() ===
            searchText.toLocaleLowerCase()
        )
      ) {
        return [...options, { name: searchText }];
      }
      return filtered;
    },
    [searchText, loading, options]
  );

  const searchInputChange = React.useCallback(
    (
      _: React.ChangeEvent<unknown>,
      query: string,
      reason: AutocompleteInputChangeReason
    ) => {
      if (reason === 'input') {
        setSearchText(query);
      } else {
        setSearchText(''); // Clear input on select
      }
    },
    [setSearchText]
  );

  React.useEffect(() => {
    setLoading(autocompleteOpen);
    if (autocompleteOpen) {
      handleSearch();
    }
  }, [autocompleteOpen, searchText]);

  const handleAutocompleteSelect = (
    _: React.ChangeEvent<unknown>,
    value: FilterOption | string | null
  ) => {
    if (!value) return;
    setSearchText(''); // Clear input on select
    append(
      typeof value === 'string'
        ? { name: value }
        : { ...value, external: false }
    );
  };

  return (
    <Autocomplete
      fullWidth
      id="dataentity-tag-add-name-search"
      open={autocompleteOpen}
      onOpen={() => setAutocompleteOpen(true)}
      onClose={() => setAutocompleteOpen(false)}
      onChange={handleAutocompleteSelect}
      options={options}
      onInputChange={searchInputChange}
      getOptionLabel={getOptionLabel}
      filterOptions={getFilterOptions}
      loading={loading}
      handleHomeEndKeys
      selectOnFocus
      blurOnSelect
      freeSolo
      value={{ name: searchText }}
      clearIcon={<ClearIcon />}
      renderInput={params => (
        <AppInput
          {...params}
          ref={params.InputProps.ref}
          placeholder="Enter tag name…"
          customEndAdornment={{
            variant: 'loader',
            showAdornment: loading,
            position: { mr: 4 },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <OptionsContainer $isImportant={option.important}>
            <Typography variant="body1">
              {option.id ? (
                option.name
              ) : (
                <AutocompleteSuggestion
                  optionLabel="tag"
                  optionName={option.name}
                />
              )}
            </Typography>
          </OptionsContainer>
        </li>
      )}
    />
  );
};

export default TagsEditFormAutocomplete;
