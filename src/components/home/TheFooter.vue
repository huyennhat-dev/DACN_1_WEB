<template>
    <!-- Footer -->
    <MDBFooter>
      <!-- Section: Social media -->
      <section
        class="d-flex justify-content-center justify-content-lg-between p-2"
      id="footer">
      </section>
      <!-- Section: Social media -->
  
      <!-- Section: Links  -->
      <section class="">
        <MDBContainer class="text-center text-md-start mt-5">
          <!-- Grid row -->
          <MDBRow class="mt-3">
            <!-- Grid column -->
            <MDBCol md="3" lg="4" xl="3" class="mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit.
              </p>
            </MDBCol>
            <!-- Grid column -->
  
            <!-- Grid column -->
            <MDBCol md="2" lg="2" xl="2" class="mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" class="text-reset">Angular</a>
              </p>
              <p>
                <a href="#!" class="text-reset">React</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Vue</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Laravel</a>
              </p>
            </MDBCol>
            <!-- Grid column -->
  
            <!-- Grid column -->
            <MDBCol md="3" lg="2" xl="2" class="mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" class="text-reset">Pricing</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Settings</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Orders</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Help</a>
              </p>
            </MDBCol>
            <!-- Grid column -->
  
            <!-- Grid column -->
            <MDBCol md="4" lg="3" xl="3" class="mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i class="fas fa-home me-3 link-secondary"></i> New York,
                NY 10012, US
              </p>
              <p>
                <i class="fas fa-envelope me-3 link-secondary"></i>
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" class="me-3 link-secondary" />
                + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" class="me-3 link-secondary" />
                + 01 234 567 89
              </p>
            </MDBCol>
            <!-- Grid column -->
          </MDBRow>
          <!-- Grid row -->
        </MDBContainer>
      </section>
      <!-- Section: Links  -->
  
      <!-- Copyright -->
      <div
        class="text-center p-4"
        style="background-color: rgba(0, 0, 0, 0.05)"
      >
        © 2021 Copyright:
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/"
          >MDBootstrap.com</a
        >
      </div>
      <!-- Copyright -->
    </MDBFooter>
    <!-- Footer -->
  </template>
  <script lang="ts">
    import { MDBFooter, MDBIcon, MDBRow, MDBCol, MDBContainer } from "mdb-vue-ui-kit";
  
    export default {
      components: {
        MDBFooter,
        MDBIcon,
        MDBRow,
        MDBCol,
        MDBContainer
      }
    }
  </script>

  <style>
  #footer{
    margin-top: 60px;
  }

  .text-uppercase{
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
  }
</style>