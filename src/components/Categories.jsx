import { useEffect, useState } from "react";
import { getCategories } from "../apis";

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
      {categories.map((category) => {
        return (
          <li>
            <h2>{category.slug}</h2>
            <h3>{category.description}</h3>
          </li>
        );
      })}
    </ul>
  );
};

export default Categories;
