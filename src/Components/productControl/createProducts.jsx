
import UploadForm from './createProductForm';
import useAuthRedirect from '../../utility/useAuthRedirect';

function CreateProduct() {
    const { loadingAuth } = useAuthRedirect();

    if (loadingAuth) return <div>Loading...</div>; // Display loading state
    return (
        <div>
            <UploadForm />
        </div>
    );
}

export default CreateProduct;