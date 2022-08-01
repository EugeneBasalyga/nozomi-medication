import ApiService from './api';

class MedicationApi extends ApiService {
  constructor() {
    if (MedicationApi.instance) {
      return MedicationApi.instance;
    }

    super('http://localhost:3001');
    MedicationApi.instance = this;
  }

  async createMedication(data) {
    const response = await this.http.post('/medications', data);
    return response.data;
  }

  async getMedicationById(medicationId) {
    const response = await this.http.get(`/medications/${medicationId}`);
    return response.data;
  }

  async getMedications() {
    const response = await this.http.get('/medications');
    return response.data;
  }

  async updateMedication(medicationId, data) {
    const response = await this.http.put(`/medications/${medicationId}`, data);
    return response.data;
  }

  async updateMedicationCurrentCount(medicationId, data) {
    const response = await this.http.patch(`/medications/${medicationId}`, data);
    return response.data;
  }

  async deleteMedication(medicationId) {
    const response = await this.http.delete(`/medications/${medicationId}`);
    return response.data;
  }
}

const medicationApiInstance = new MedicationApi();
export default medicationApiInstance;
