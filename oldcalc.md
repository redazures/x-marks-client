<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>X Marks</title>
    <script src="https://kit.fontawesome.com/a4cb4a26ad.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="styles/sytle.css">
    <!-- <script src='src/fetchadapter.js'></script> -->
</head>
    <div class="container">
        <div class="header">
            <h1>X-Marks-the-Spot</h1>
            <h4>Welcome <span class="Usersname"></span></h4>
        </div>
        <button class="date"><span id="datetime"></span><i class="fas fa-sign-out-alt"></i></button>
        <script>
            var dt = new Date();
            document.getElementById("datetime").innerHTML = dt.toLocaleDateString();
        </script>
        <!-- <div class="date">Welcome to X Marks: 2020-9-4</div> -->
        <ul class="currencies">
            <li class='currency base-currency'id="USD">
                <img src="https://images-na.ssl-images-amazon.com/images/I/71pY5Ee5F8L._AC_SL1500_.jpg" alt="USD" class="flag" width="100px">
                <div class='info'>
                    <p class="input"><span class="currency-symbol">USD</span><span class="balance" width='80%'>0</span></p>
                    <p class='currency-name'>Combined Currencies</p>
                    <p class='base-currency-rate'>Net USD value</p>
                </div>
                <!-- <span class='add-currency'>&times;</span>
                <span class='close'>here</span> -->
            </li>
            <!-- <li class='currency'id="JPY">
                <img src="https://cdn.britannica.com/91/1791-004-1998D4C6/Flag-Japan.jpg" alt="JPY" class="flag" width="100px">
                <div class='info'>
                    <p class="input"><span class="currency-symbol">JPY</span> 1,000,000</p>
                    <p class='currency-name'>Japanese Yen</p>
                    <p class='base-currency-rate'>Price</p>
                </div>
                <span class='buy'>Buy <i class="fas fa-money-bill-alt"></i></span>
                <span class='sell'>Sell <i class="fas fa-cash-register"></i></span>
            </li> -->
        </ul>
        <button class="add-currency-btn"><i class="fas fa-angle-double-left"></i>Currency</button>
        <ul class='add-currency-list'>
            <!-- <li data-currency="USD" class="disabled"><img src="https://images-na.ssl-images-amazon.com/images/I/71pY5Ee5F8L._AC_SL1500_.jpg" class="flag"><span>USD - US Dollar</span></li> -->
        </ul>
        <div class='forms'>
            <form class='signup'>
                <p>Please sign up </p><br><br><br>
                <label class='tag'>Username</label><input type="text" id="name" name="name"><br><br>
                <label class='tag'>Email</label><input type="text" id="email" name="email"><br><br>
                <label class='tag'>Age</label><input type="number" id="age" name="age"><br><br>
                <label class='tag'>Credit Card Number</label><input type="number" id="creditcard" name="creditcard"><br><br>
                <input type='submit' class='submit-signup' value='Sign Up Now'><br><br><br>
              </form>
              <form class='login'>
                <p>Or Login</p><br><br><br>
                <label>Username</label><input type="text" id="name" name="name"><br><br>
                <input type='submit'class='submit-login' value='Login Now'><br><br><br>
              </form>
        </div>
    </div>
<body>
 <script src="src/main.js"></script>   
</body>
</html>