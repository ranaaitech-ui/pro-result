/**
 * Converts a File object to a Base64 encoded string.
 * This is crucial for html2canvas to work without tossing Tainted Canvas errors.
 * 
 * @param {File} file 
 * @returns {Promise<string>} Base64 string of the image
 */
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve('');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
