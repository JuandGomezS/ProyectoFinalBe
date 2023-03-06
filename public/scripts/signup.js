const form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const fileInput = document.querySelector('#imageUpload');
    const file = fileInput.files[0];

    const base64String = await readFileAsDataURL(file);

    try {
        const response = await fetch('/api/upload-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({ username, password, image: base64String })
        });

        if (response.ok) {
            console.log('Image uploaded successfully');
        } else {
            console.error(`Failed to upload image: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Failed to upload image: ${error}`);
    }
});

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
        }

        reader.onerror = function () {
            reject(reader.error);
        }

        reader.readAsDataURL(file);
    });
}