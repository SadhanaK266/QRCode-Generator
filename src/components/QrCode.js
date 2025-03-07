import React, { useState } from 'react'
import '../css/QrCode.css'
export const QrCode = () => {

    var [qrData, setQrData] = useState("")
    var [qrSize, setQrSize] = useState()
    var [img, setImg] = useState("")

    function handleGenerator() {
        if(qrData && qrSize){
        var url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`
        setImg(url)
        setQrData("")
        setQrSize("")
        }
        else{
            alert(" Please fill all the fields")
        }
    }

    function handleDownload(){
        fetch(img)
        .then((respose)=>respose.blob())
        .then((blob)=>{
            var link=document.createElement("a")
            link.href=URL.createObjectURL(blob)
            link.download="qr-code.png"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
    }

    return (
        <div className='container'>
            <h1>QR Code Generator</h1>
            {img && <img src={img} alt="QR Code"/>}
            <div>
                <label htmlFor="data">Data for QR Code:</label>
                <input type="text" required value={qrData} id='data' placeholder='Enter Data for QR Code' onChange={(e) => setQrData(e.target.value)} />
                <label htmlFor="size">Image size (e.g., 150):</label>
                <input type="number" required id='size' value={qrSize} placeholder='Enter size for QR code' onChange={(e) => setQrSize(e.target.value)} />
                <div className='buttons'><button className='generate' onClick={handleGenerator}>Generate QR Code</button>
                    <button className='download' onClick={handleDownload}>Download QR Code</button>
                </div></div>
        </div>
    )
}
