import PropTypes from 'prop-types';

const Categories = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="text-lg text-slate-700">
      <p>Kategori popular</p>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`border rounded-lg px-2 pb-1 mr-2 ${
              selectedCategory === category
                ? 'bg-indigo-500 text-white'
                : 'border-gray-500'
            }`}
            type="button"
            onClick={() => onCategoryClick(category)}
          >
            <p>#{category}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default Categories;
