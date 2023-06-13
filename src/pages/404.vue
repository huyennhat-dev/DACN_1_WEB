<template>
  <div class="d-flex align-items-center justify-content-center vh-100 w-100">
    <a-result
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    >
      <template #extra>
        <a-button
          @click="this.$router.push({ name: 'index' })"
          type="primary"
          class="brr-5"
          ghost
        >
          Back Home
        </a-button>
      </template>
    </a-result>
  </div>
</template>
