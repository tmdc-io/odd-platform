import { connect } from 'react-redux';
import { RootState } from 'redux/interfaces';
import {
  getDataEntityMetadataCreateFetching,
  getMetadataFieldList,
} from 'redux/selectors/metadata.selectors';
import {
  createDataEntityCustomMetadata,
  searchMetadata,
} from 'redux/thunks/metadata.thunks';
import MetadataCreateForm from './MetadataCreateForm';

const mapStateToProps = (state: RootState) => ({
  metadataOptions: getMetadataFieldList(state),
  isLoading: getDataEntityMetadataCreateFetching(state),
});

const mapDispatchToProps = {
  searchMetadata,
  createDataEntityCustomMetadata,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetadataCreateForm);
