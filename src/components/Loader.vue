<template>
  <div className="smooth-loader" />
</template>

<style>
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .smooth-loader {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border-top: 0.5rem solid #ff901b;
    border-left: 0.5rem solid #ff321a;
    border-right: 0.5rem solid rgba(255, 255, 255, 0);
    animation: spin 0.575s infinite linear;
  }
</style>
