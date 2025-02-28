            
            const scriptURL = 'https://script.google.com/macros/s/AKfycbzbS-oRHf8-LPZZKDQY7gZeywlzqiK8XWBkgAFUQs7k9AfMGD7buxFLIe7wOM1BxTqt/exec'
            const form = document.forms['submit-to-google-sheet']
          
            form.addEventListener('submit', e => {
              e.preventDefault()
              fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))
            })
         