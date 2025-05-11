<template>
  <div class="apa-property-module">
    <h1>List of Properties</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div v-if="properties.length" class="property-grid">
        <div
          v-for="property in properties"
          :key="property.propertyId"
          class="property-card"
        >
          <h2>{{ property.title }}</h2>
          <p><strong>Address:</strong> {{ property.address }}</p>
          <p><strong>Price Range:</strong> {{ property.minPrice }} - {{ property.maxPrice }}</p>
          <button
            @click="togglePropertyBody(property)"
            class="toggle-button"
          >
            {{ property.showBody ? 'Hide Details' : 'Show Details' }}
          </button>
          <div v-if="property.showBody" class="property-body" v-html="property.body"></div>
          <a
            :href="property.website"
            target="_blank"
            rel="noopener noreferrer"
            class="property-link"
          >
            Visit Website
          </a>
        </div>
      </div>
      <p v-else>No properties found.</p>
      <div class="pagination">
        <button
          :disabled="currentPage === 1 || loading"
          @click="changePage(Number(currentPage) - 1)"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages || loading"
          @click="changePage(Number(currentPage) + 1)"
        >
          Next {{currentPage}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "ApaPropertyModule",
  setup() {
    const properties = ref([]);
    const loading = ref(true);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const limit = 9;

    const fetchProperties = async (page = 1) => {
      loading.value = true;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/properties?page=${page}&limit=${limit}`
        );
        // Tambahkan field showBody ke setiap property
        properties.value = (response.data.data || []).map((property) => ({
          ...property,
          showBody: false,
        }));
        totalPages.value = Math.ceil(response.data.total / response.data.limit);
        currentPage.value = response.data.page;
      } catch (error) {
        console.error("Error fetching properties:", error);
        properties.value = [];
      } finally {
        loading.value = false;
      }
    };

    const changePage = (page) => {
      const newPage = Math.max(1, Math.min(Number(page), totalPages.value)); // pastikan angka valid
      if (newPage !== currentPage.value) {
        currentPage.value = newPage;
        fetchProperties(newPage); // gunakan newPage langsung
      }
    };

    const togglePropertyBody = (property) => {
      property.showBody = !property.showBody;
    };

    onMounted(() => fetchProperties(currentPage.value));

    return { properties, loading, currentPage, totalPages, changePage, togglePropertyBody };
  },
};
</script>

<style scoped>
.apa-property-module {
  max-width: 1200px;
  margin: 2rem auto;
  font-family: 'Arial', sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #4caf50;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.property-card {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.property-card h2 {
  font-size: 1.5rem;
  color: #4caf50;
  margin-bottom: 0.5rem;
}

.property-card p {
  margin: 0.5rem 0;
  color: #555;
}

.property-body {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f1f1f1;
  border-radius: 5px;
  max-height: 300px;
  overflow-y: auto;
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.property-link {
  display: inline-block;
  margin-top: 1rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
}

.property-link:hover {
  text-decoration: underline;
}

.toggle-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease, transform 0.2s ease;
}

.toggle-button:hover {
  background: #45a049;
  transform: scale(1.05);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 1rem;
  color: #333;
}
</style>
