<template>
    <div class="contact-page">
      <div class="contact-header">
        <h1>Hubungi Saya</h1>
        <p>Let's connect through:</p>
      </div>
  
      <div class="contact-options">
        <div class="contact-card" @click="openLink('https://www.facebook.com/topikajolah.lah.7?mibextid=ZbWKwL')">
          <q-icon name="facebook" class="contact-icon" />
          <span>Facebook</span>
        </div>
        <div class="contact-card" @click="openLink('https://www.instagram.com/mtaufikkurrahmann/')">
          <q-icon name="instagram" class="contact-icon" />
          <span>Instagram</span>
        </div>
        <div class="contact-card" @click="openLink('https://wa.me/065376041304')">
          <q-icon name="chat" class="contact-icon" />
          <span>WhatsApp</span>
        </div>
        <div class="contact-card" @click="openLink('tel:+6285356041304')">
          <q-icon name="phone" class="contact-icon" />
          <span>Phone</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { openURL } from 'quasar'
  
  const openLink = (url) => {
    openURL(url)
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  .contact-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(to right, #8360c3, #2ebf91);
    padding: 20px;
    color: white;
    font-family: 'Poppins', sans-serif;
    text-align: center;
  }
  
  .contact-header {
    margin-bottom: 40px;
  }
  
  .contact-header h1 {
    font-size: 48px;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    animation: fadeInDown 1s ease;
  }
  
  .contact-header p {
    font-size: 24px;
    margin-bottom: 40px;
    animation: fadeIn 1.5s ease;
  }
  
  .contact-options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .contact-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    text-align: center;
  }
  
  .contact-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .contact-icon {
    font-size: 48px;
    margin-bottom: 10px;
  }
  
  .contact-card span {
    font-size: 18px;
    font-weight: bold;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 600px) {
    .contact-header h1 {
      font-size: 36px;
    }
  
    .contact-header p {
      font-size: 18px;
    }
  
    .contact-card {
      width: 90%;
      margin: 10px auto;
    }
  }
  </style>
  