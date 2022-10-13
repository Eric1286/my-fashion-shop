import classes from "./ProductList.module.scss";
import ProductItem from "./ProductItem";

const ProductList = (props) => {
  const { items } = props;
  return (
    <ul className={classes["product__list"]}>
      {items.map((item) => (
        <ProductItem
          key={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          id={item.id}
        />
      ))}
    </ul>
  );
};
export default ProductList;
