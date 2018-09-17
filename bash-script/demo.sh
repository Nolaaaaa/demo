mkdir $1
cd $1
mkdir css js
touch index.html css/style.css js/main.js
Echo "<!DOCTYPE>
 <title>Hello</title>
 <h1>Hi</h1>" >> index.html
Echo "h1{color: red;}" >> css/style.css
Echo "var string = "Hello World"
alert(string)" >> js/main.js
export PATH="/Users/nola/desktop/demo:$PATH"
exit