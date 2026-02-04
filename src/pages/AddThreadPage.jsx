import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThread } from '../states/threads/action';
import AddThreadInput from '../components/AddThreadInput';

const AddThreadPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAdd = ({ title, body, category }) => {
    dispatch(asyncCreateThread({ title, body, category }));
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Buat Diskusi Baru
      </h2>
      <AddThreadInput onAddThread={onAdd} />
    </div>
  );
};
export default AddThreadPage;
