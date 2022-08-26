import ApiService from './api';

class MedicationApi extends ApiService {
  constructor() {
    if (MedicationApi.instance) {
      return MedicationApi.instance;
    }

    super('http://localhost:3001/medications');
    MedicationApi.instance = this;
  }

  async createMedication(data) {
    const response = await this.http.post('', data);
    return response.data;
  }

  async getMedicationById(medicationId) {
    const response = await this.http.get(`/${medicationId}`);
    return response.data;
  }

  async getMedications() {
    const response = await this.http.get('');
    return response.data;
  }

  async updateMedication(medicationId, data) {
    const response = await this.http.put(`/${medicationId}`, data);
    return response.data;
  }

  async updateMedicationCurrentCount(medicationId, medicationCount) {
    const response = await this.http.patch(`/${medicationId}`, { id: medicationId, count: medicationCount });
    return response.data;
  }

  async deleteMedication(medicationId) {
    const response = await this.http.delete(`/${medicationId}`);
    return response.data;
  }
}

const medicationApiInstance = new MedicationApi();
export default medicationApiInstance;
