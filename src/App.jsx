import { useState, useRef } from 'react';
import { FiUpload, FiDownload } from 'react-icons/fi';
import { createTaskId,taskIdResult, createTaskIdBg, taskIdResultBG} from './service/picwish'

const App = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTool, setActiveTool] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFile(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setProcessedImage(null); 
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFile(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setProcessedImage(null); 
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const removeBackground = async ( tool) => {
        // e.preventDefault()
        setActiveTool(tool);
        setIsProcessing(true);
          if (file) {
          let task_id =   await  createTaskIdBg(file)
          console.log("bg task_id: ", task_id);  
             let image = await taskIdResultBG(task_id)
             if(image) {
                setProcessedImage(image); 
                setIsProcessing(false);
          }
          else {
            setIsProcessing(false);
            console.log("error: ", "image is null");
          }  
        }
      };


        const enhanceImage = async (tool) => {
            setActiveTool(tool);
            setIsProcessing(true);
          if (file) {
            let task_id = await createTaskId(file)
            console.log("task_id: ", task_id);  
            let image = await taskIdResult(task_id)
            if (image) {
                setProcessedImage(image); 
                setIsProcessing(false);
            }
            else {
                setIsProcessing(false);
              console.log("error: ", "image is null");
            }
          }
        };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const downloadImage = (imageUrl, fileName) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName; // e.g., "enhanced-image.jpg" or "no-bg-image.jpg"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}

            <header className="bg-white shadow-sm  py-4 px-6">
                <div className="flex items-center justify-center text-center space-x-2">
                    <h1 className="text-xl font-bold text-gray-800 ">AI Image Enhancer and Remove Background</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow py-8 px-4 max-w-6xl mx-auto w-full">
                {!image ? (
                    // Upload Section
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 transition-colors bg-white"
                        onClick={triggerFileInput}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <FiUpload className="text-4xl text-blue-500" />
                            <h2 className="text-xl font-semibold text-gray-700">Drag & drop your image here</h2>
                            <p className="text-gray-500">or click to browse files</p>
                            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Select Image
                            </button>
                            <p className="text-sm text-gray-400 mt-4">Supported formats: JPG, PNG, WEBP</p>
                        </div>
                    </div>
                ) : !processedImage ? (
                    // Image Preview with Tools
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex flex-col items-center">
                            <div className="mb-6 w-full max-w-2xl">
                                <img
                                    src={image}
                                    alt="Uploaded preview"
                                    className="w-full h-auto rounded-lg border border-gray-200"
                                />
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 mb-6">
                                <button
                                    onClick={() => enhanceImage('enhance')}
                                    className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    <span className="mr-2">✨</span> Enhance Image
                                </button>
                                <button
                                    onClick={() => removeBackground('remove-bg')}
                                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <span className="mr-2">✂️</span> Remove Background
                                </button>
                            </div>

                            <button
                                onClick={() => setImage(null)}
                                className="text-gray-500 hover:text-gray-700 underline text-sm"
                            >
                                Upload different image
                            </button>
                        </div>
                    </div>
                ) : (
                    // Processed Result
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">Your {activeTool === 'enhance' ? 'Enhanced' : 'Background Removed'} Image</h2>

                            <div className="w-full max-w-4xl mb-8">
                                <div className="relative" style={{ paddingBottom: '50%' }}>
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/2 h-full p-2">
                                            <p className="text-sm text-gray-500 mb-1">Original</p>
                                            <img
                                                src={image}
                                                alt="Original"
                                                className="w-full h-full object-contain border border-gray-200 rounded-l"
                                            />
                                        </div>
                                        <div className="w-1/2 h-full p-2">
                                            <p className="text-sm text-gray-500 mb-1">Result</p>
                                            <img
                                                src={processedImage}
                                                alt="Processed"
                                                className="w-full h-full object-contain border border-gray-200 rounded-r"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 mb-6">
                                <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => downloadImage(processedImage, 'no-bg-image.jpg')}>
                                    <FiDownload className="mr-2" /> Download Image
                                </button>
                                <button
                                    onClick={() => setProcessedImage(null)}
                                    className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Try Another
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Processing Overlay */}
                {isProcessing && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-xl max-w-sm w-full text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <h3 className="text-lg font-medium mb-2">
                                {activeTool === 'enhance' ? 'Enhancing' : 'Removing background from'} your image...
                            </h3>
                            <p className="text-gray-600">This may take a few seconds</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 px-4">

                <div className="flex justify-center items-center">

                    <p className="text-gray-300">© 2023 Image Editor Pro. All rights reserved.</p>

                </div>
            </footer>
        </div>
    );
};

export default App;