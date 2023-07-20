import { useEffect, useState } from "react";
import { getCategories } from "../apis";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <ul className="categoryList">
      {categories.map((category) => (
        <li key={category.slug} className={category.slug}>
          <Link to={`/reviews?category=${category.slug}`}>
            <h2>{category.slug}</h2>
            <h3>{category.description}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
