import api from '@/services/api';
import ipapi from '@/services/ipapi';

export default {
  async report(id) {
    try {
      const { data } = await api().get(`info/report/${id}`);
      return data;
    } catch (e) {
      return false;
    }
  },

  async ip() {
    try {
      const { data } = await ipapi().get();
      return data;
    } catch (e) {
      return false;
    }
  }
};
