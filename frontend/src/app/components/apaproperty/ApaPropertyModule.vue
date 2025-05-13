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
          <button
            @click="fetchAIInsight(property)"
            class="ai-insight-button"
            :disabled="property.loadingAI"
          >
            <span v-if="property.loadingAI">Loading...</span>
            <span v-else>AI Insight</span>
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
          Next
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
    const chatGptResponse = ref(""); // Store ChatGPT response
    const limit = 4;

    const fetchProperties = async (page = 1) => {
      loading.value = true;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/properties?page=${page}&limit=${limit}`
        );
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

    const fetchAIInsight = async (property) => {
      property.loadingAI = true; // Set loading state
      try {
        const prompt = `Analyze the following property: Title - ${property.title}, Address - ${property.address}, Price Range - ${property.minPrice} to ${property.maxPrice} and create 5 social media tags about it`;
        const response = await axios.post(`http://localhost:3000/api/chatgpt/response`, {
          prompt,
        });
        alert(`${response.data}`);
      } catch (error) {
        console.error("Error fetching AI insight:", error);
        alert("Failed to fetch AI insight.");
      } finally {
        property.loadingAI = false; // Reset loading state
      }
    };

    const changePage = (page) => {
      const newPage = Math.max(1, Math.min(Number(page), totalPages.value));
      if (newPage !== currentPage.value) {
        currentPage.value = newPage;
        fetchProperties(newPage);
      }
    };

    const togglePropertyBody = (property) => {
      property.showBody = !property.showBody;
    };

    onMounted(() => fetchProperties(currentPage.value));

    return { properties, loading, currentPage, totalPages, chatGptResponse, changePage, togglePropertyBody, fetchAIInsight };
  },
};
</script>

<style scoped>
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.property-card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.property-card h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.property-card p {
  font-size: 1rem;
  color: #555;
  margin: 0.5rem 0;
}

.property-card .toggle-button {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.property-card .toggle-button:hover {
  background: #45a049;
}

.property-card .property-link {
  display: inline-block;
  margin-top: 1rem;
  color: #4caf50;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.property-card .property-link:hover {
  color: #388e3c;
}

.property-body {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination button {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
  box-shadow: none;
}

.pagination button:hover:not(:disabled) {
  background: #45a049;
  transform: translateY(-2px);
}

.pagination button:active:not(:disabled) {
  transform: scale(0.98);
}

.pagination span {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}
<style scoped>
 .chatgpt-response-box {
   background: linear-gradient(135deg, #e0f7fa, #e8f5e9);
   border: 1px solid #b2dfdb;
   border-radius: 15px;
   padding: 1.5rem;
   margin: 2rem 0;
   box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
   transition: transform 0.3s ease, box-shadow 0.3s ease;
 }

.chatgpt-response-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.chatgpt-response-box h2 {
  color: #00796b;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: bold;
}

.chatgpt-response-box p {
  color: #004d40;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: justify;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.chatgpt-response-box p::first-letter {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00796b;
}

.apa-property-module {
  padding: 2rem;
  margin: 1rem auto;
  max-width: 1200px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.apa-property-module h1 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
}

.ai-insight-button {
  margin-left: auto;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: background 0.3s ease;
}

.ai-insight-button:hover {
  background: #1976d2;
}
</style>
