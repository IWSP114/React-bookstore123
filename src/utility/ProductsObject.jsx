import {useEffect, useState} from 'react'
import { ProductContext } from './CartLoader'
import PropTypes from 'prop-types';

export function ProductObject({ children }) {
  ProductObject.propTypes = {
    children: PropTypes.node
  };
  
  const [products, setProducts] = useState([
        {
          productID: "A98DB973KWL8XP1L", 
          name: "The Family Book By Todd Parr", 
          description: "The Family Book by Todd Parr is a vibrant children's picture book that explores the diversity of family structures in a fun and engaging way. Published in 2003, it is designed for young readers and emphasizes the message that all families, regardless of their makeup, are special and deserving of love.", 
          type: "Story Book", 
          price: 6.40},

        {
          productID: "41T81V4BZZQH0FOY", 
          name: "Maybe Days By Jennifer Wilgocki and Marcia Kahn Wright", 
          description: "Maybe Days: A Book for Children in Foster Care is a children's picture book co-authored by Jennifer Wilgocki and Marcia Kahn Wright, published in 2001. It is specifically designed to address the unique experiences and emotions of children in foster care, providing them with reassurance and understanding during a time of uncertainty.", 
          type: "Story Book", 
          price: 9.29},

        {
          productID: "KH9NHAKRFF6XFV4D", 
          name: "Boy by Phil Cummings, Illustrated by Shane DeVries", 
          description: "Boy by Phil Cummings, illustrated by Shane Devries, is a poignant children's picture book published in May 2017. The story revolves around a young boy who is hearing-impaired and communicates through sign language and drawings. Despite his inability to hear the chaos of battle between the king and a dragon, Boy's unique perspective becomes the catalyst for resolving conflict.",
          type: "Story Book", 
          price: 9.99},

        {
          productID: "1D36OFE9MK0FW0X5", 
          name: "Ceremony: Welcome to Our Country by Adam Goodes and Ellie Laing, Illustrated by David Hardy", 
          description: "Ceremony: Welcome to Our Country is a children's picture book co-authored by Adam Goodes and Ellie Laing, with illustrations by David Hardy. Released in April 2022, this book serves as a joyful introduction to First Nations culture, specifically focusing on the Adnyamathanha people of the Flinders Ranges.", 
          type: "Story Book", 
          price: 12.99},

        {
          productID: "8IXY4B8S3GU73WIO", 
          name: "This Book Thinks Ya Deadly! by Corey Tutt", 
          description: "This Book Thinks Ya Deadly! by Corey Tutt, illustrated by Molly Hunt, is a vibrant and inspirational celebration of First Nations excellence, published in 2023. The book serves as a compendium that highlights the achievements of 80 Indigenous Australians across various fields, including arts, sports, science, and activism.",
          type: "Story Book", 
          price: 14.99},

        {
          productID: "ONRGBG1AALOPK1C6", 
          name: "Mommy, Mama and Me & Daddy, Papa and Me by Leslea Newman",
          description: "Mommy, Mama, and Me and Daddy, Papa, and Me are two companion board books written by Lesléa Newman and illustrated by Carol Thompson. Published in 2009, these books are groundbreaking as they are among the first board books specifically designed for children with same-sex parents. They celebrate family diversity through simple, relatable narratives.",  
          type: "Story Book", 
          price: 7.59},

        {
          productID: "VJKZIMV2HQH8R65P", 
          name: "A House for Everyone by Jo Hirst", 
          description: "A House for Everyone: A Story to Help Children Learn about Gender Identity and Gender Expression by Jo Hirst, illustrated by Naomi Bardoff, is a children's picture book published in 2018. This book serves as an important resource for introducing young readers to the concepts of gender identity and expression, promoting acceptance and understanding of diversity.", 
          type: "Story Book", 
          price: 15.89}
    ]);

    useEffect(()=>{
      console.log("Origal Products Changed")
    }, [products])

    return (
          <ProductContext.Provider value={{ products, setProducts }}>
              {children}
          </ProductContext.Provider>
      );
}

