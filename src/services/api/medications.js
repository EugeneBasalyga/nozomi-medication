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

  async getMedicationById(accountId) {
    const response = await this.http.get(`/medications/${accountId}`);
    return response.data;
  }

  async getMedications() {
    const response = await this.http.get('/medications');
    return response.data;
  }

  async updateMedication(accountId, data) {
    const response = await this.http.put(`/medications/${accountId}`, data);
    return response.data;
  }
}

const medicationApiInstance = new MedicationApi();
export default medicationApiInstance;
