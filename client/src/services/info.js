import api from '@/services/api';

export default {
  async report(id) {
    try {
      const { data } = await api().get(`info/report/${id}`);
      return data;
    } catch (e) {
      return false;
    }
  }
};
