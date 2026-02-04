import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

const AddThreadInput = ({ onAddThread }) => {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddThread({ title, body, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          placeholder="Judul"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <input
          type="text"
          id="category"
          value={category}
          onChange={onCategoryChange}
          placeholder="Kategori"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <textarea
          id="body"
          value={body}
          onChange={onBodyChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
      >
        Buat
      </button>
    </form>
  );
};

AddThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default AddThreadInput;
