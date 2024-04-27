<template>
  <footer class="footer">
    <div class="social-icons">
      <p>Follow Me :</p>
      <a href="https://www.facebook.com/profile.php?id=100028643374400" class="facebook"><i class="fab fa-facebook"></i></a>
      <a href="#" class="whatsapp"><i class="fab fa-whatsapp"></i></a>
      <a href="https://www.instagram.com/mtaufikkurrahmann/?hl=en" class="instagram"><i class="fab fa-instagram"></i></a>
      <a href="https://github.com/mtaufik04" class="github"><i class="fab fa-github"></i></a>
      <a href="https://www.linkedin.com/in/m-taufik-karrahman-22927b2bb/" class="linkedin"><i class="fab fa-linkedin"></i></a>
      <a href="https://www.youtube.com/channel/UCtYnFhEY0atGBUlBDFHeqfA" class="youtube"><i class="fab fa-youtube"></i></a>
    </div>
    <div class="copyright">
      <p>Copyright &copy; 2024 M.TAUFIK KURRAHMAN. All rights reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(13, 9, 9);
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-icons a {
  margin: 0 10px;
  color: #fff;
  font-size: 24px;
  transition: color 0.3s;
  border: 2px solid transparent;
  padding: 8px;
  border-radius: 50%;
}

.youtube:hover .fab {
  color: #FF0000;
}

.whatsapp:hover .fab {
  color: #25D366; 
}

.facebook:hover .fab {
  color: #3b5998; 
}

.instagram:hover .fab {
  color: rgb(240, 20, 152); 
}

.github:hover .fab {
  color: #211F1F; 
}

.linkedin:hover .fab {
  color: #6f3535; 
}

.social-icons .fab {
  transition: transform 0.3s;
}

.social-icons .fab:hover {
  transform: scale(1.2);
}

.copyright {
  flex-grow: 1; 
  text-align: center; 
  border: 2px solid #b80303; 
  padding: 5px 10px; 
  border-radius: 5px; 
  margin: 0 300px;
}
</style>
