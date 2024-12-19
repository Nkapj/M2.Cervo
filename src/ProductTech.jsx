
import { useEffect } from 'react';
import Product from './data/productTech.json';


function ProducTech () {
    const [productList, setProductList] = useState(products);


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('http://localhost:4000/');
                const data = await response.json();
            } catch (error) {
            console.log ("error")
            }
        }
        
    
    },[]);













return {

    };
}
