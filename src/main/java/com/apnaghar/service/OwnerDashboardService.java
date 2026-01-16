package com.apnaghar.service;

import com.apnaghar.dto.OwnerDashboardResponse;

public interface OwnerDashboardService {

    OwnerDashboardResponse getDashboard(String ownerEmail);
}
