import React, {useEffect, useState} from 'react'
import { useHttp } from '../../hooks/http.hook';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';
import {ICategory, ISubCategory} from '../../types/ICatalog';

const AdminAdd = () => {
    const {request} = useHttp()
    const [catalogList, setCatalogList] = useState<ICategory[]>([])
    const [activeCategory, setActiveCategory] = useState<string>('')
    const [activeSubCategory, setSubActiveCategory] = useState<string>('')

    useEffect(() => {
        async function getCatalog() {
            const data = await request('/api/catalog/getCategory', 'GET')
            .then(data => setCatalogList(data.catalog))
            console.log(data)
        }
        getCatalog()
    }, [])
    
    function setNewStates(id: string) {
        setSubActiveCategory('')
        setActiveCategory(id)
    }
    
    function addNewProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        let fileElem = document.getElementById('img') as HTMLInputElement
        if(!fileElem || !fileElem.files || !fileElem.files[0]) {
            return
        }
        let productName = document.getElementById('name') as HTMLInputElement
        let productDescription = document.getElementById('description') as HTMLInputElement
        let productPrice = document.getElementById('price') as HTMLInputElement
        let productArticle = document.getElementById('article') as HTMLInputElement
        let productQuantity = document.getElementById('quantity') as HTMLInputElement
        let formData = new FormData()
        formData.append('name', productName.value)
        formData.append('description', productDescription.value)
        formData.append('price', productPrice.value)
        formData.append('article', productArticle.value)
        formData.append('img', fileElem.files[0])
        formData.append('quantity', productQuantity.value)
        formData.append('subCategory', activeSubCategory)

        try {
            fetch('/api/catalog/setProduct', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(json => console.log(json))
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='admin__display'>
            <p>Категория</p>
            <select name='category' onChange={e => setNewStates(e.target.value)}>
            {
                catalogList.map((elem) => {
                    return <option key={elem._id} value={elem._id}>{elem.name}</option>
                })
            }
            </select>
            <p>Подкатегория</p>
            <select name="subCategory" onChange={e => setSubActiveCategory(e.target.value)}>
            {(activeCategory)
                ?
                catalogList.map ((elem) => {
                    if(elem._id == activeCategory) {
                        return elem.subCategories.map((elem: ISubCategory) => {
                            return <option key={elem._id} value={elem._id}>{elem.name}</option>
                        })
                    }
                })
                :
                <option disabled>Выберите категорию</option>
            }
            </select>

            <form encType='multipart/form-data' style={{width:"300px", marginTop:"30px"}}>
                <MyInput placeholder="Наименование" id="name" type="text"></MyInput>
                <MyInput placeholder="Описание" id="description" type="text"></MyInput>
                <MyInput placeholder="Цена" id="price" type="text"></MyInput>
                <MyInput placeholder="Артикул" id="article" type="text"></MyInput>
                <MyInput id="img" type="file" accept="image/png, image/jpeg"></MyInput>
                <MyInput placeholder="Количество товара" id="quantity" type="text"></MyInput>
                <MyButton onClick={addNewProduct} disabled={!activeSubCategory}>Добавить</MyButton>
            </form>

        </div>
    )
}

export default AdminAdd
