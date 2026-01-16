package com.apnaghar.service;

import java.util.List;
import com.apnaghar.model.Payment;

public interface PaymentService {

    // ✅ USER PAYS FOR BOOKING
    Payment payForBooking(Long bookingId, String userEmail);

    // ✅ USER PAYMENT HISTORY
    List<Payment> getMyPayments(String userEmail);
    
    //get owner earning 
    List<Payment> getOwnerPayments(String ownerEmail);

}
