import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const EditProductComponent = () => {
    // Lấy Id của sản phẩm từ URL sử dụng useParams
    const { Id } = useParams();
    // State để lưu thông tin sản phẩm và các trường thông tin của sản phẩm
    const [product, setProduct] = useState(null);
    const [model, setModel] = useState('');
    const [cpu, setCPU] = useState('');
    const [gpu, setGPU] = useState('');
    const [ram, setRAM] = useState('');
    const [storage, setStorage] = useState('');
    const [screenSize, setScreenSize] = useState('');
    const [resolution, setResolution] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [error, setError] = useState(null);
    // Sử dụng useEffect để fetch thông tin sản phẩm từ server khi component được render
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3002/products/${Id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
                setModel(data[1]);
                setCPU(data[2]);
                setGPU(data[3]);
                setRAM(data[4]);
                setStorage(data[5]);
                setScreenSize(data[6]);
                setResolution(data[7]);
                setPrice(data[8]);
                setImg(data[9]);
                setImg1(data[10]);
                setImg2(data[11]);
                setImg3(data[12]);
                setManufacturer(data[13]);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [Id]);
    // Hàm xử lý khi người dùng nhấn nút "Update Product"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra các trường bắt buộc
        if (!model || !price) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch(`http://localhost:3002/admin/product/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                cpu,
                gpu,
                ram,
                storage,
                screenSize,
                resolution,
                price,
                img,
                img1,
                img2,
                img3,
                manufacturer
             }),
          });
    
          if (response.ok) {
            // Xử lý sau khi chỉnh sửa sản phẩm thành công
            console.log('Product updated successfully');
            alert('Product updated successfully');
          } else {
            alert('Failed to update product');
          }
        } catch (error) {
          setError('Error updating product');
          console.error('Error updating product:', error);
        }
    };
     // Nếu sản phẩm chưa được fetch, hiển thị thông báo "Loading..."
    if (!product) {
        return <div>Loading...</div>;
    }
    // Giao diện form để người dùng chỉnh sửa thông tin sản phẩm
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Edit Product</h2>
           
            <div className="mb-4">
                <label htmlFor="model" className="block text-gray-700 font-semibold mb-2">Model:</label>
                <input type="text" id="model" name="model" value={model} onChange={(e) => setModel(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="cpu" className="block text-gray-700 font-semibold mb-2">CPU:</label>
                <input type="text" id="cpu" name="cpu" value={cpu} onChange={(e) => setCPU(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="gpu" className="block text-gray-700 font-semibold mb-2">GPU:</label>
                <input type="text" id="gpu" name="gpu" value={gpu} onChange={(e) => setGPU(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="ram" className="block text-gray-700 font-semibold mb-2">RAM:</label>
                <input type="text" id="ram" name="ram" value={ram} onChange={(e) => setRAM(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="storage" className="block text-gray-700 font-semibold mb-2">Storage:</label>
                <input type="text" id="storage" name="storage" value={storage} onChange={(e) => setStorage(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="screenSize" className="block text-gray-700 font-semibold mb-2">Screen Size:</label>
                <input type="text" id="screenSize" name="screenSize" value={screenSize} onChange={(e) => setScreenSize(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="resolution" className="block text-gray-700 font-semibold mb-2">Resolution:</label>
                <input type="text" id="resolution" name="resolution" value={resolution} onChange={(e) => setResolution(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price:</label>
                <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="img" className="block text-gray-700 font-semibold mb-2">Main Image:</label>
                <input type="text" id="img" name="img" value={img} onChange={(e) => setImg(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="img1" className="block text-gray-700 font-semibold mb-2">Image 1:</label>
                <input type="text" id="img1" name="img1" value={img1} onChange={(e) => setImg1(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="img2" className="block text-gray-700 font-semibold mb-2">Image 2:</label>
                <input type="text" id="img2" name="img2" value={img2} onChange={(e) => setImg2(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="img3" className="block text-gray-700 font-semibold mb-2">Image 3:</label>
                <input type="text" id="img3" name="img3" value={img3} onChange={(e) => setImg3(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="manufacturer" className="block text-gray-700 font-semibold mb-2">Manufacturer:</label>
                <input type="text" id="manufacturer" name="manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Update Product</button>
        </form>
    );
}

export default EditProductComponent;
