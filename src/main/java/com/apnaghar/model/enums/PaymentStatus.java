package com.apnaghar.model.enums;

public enum PaymentStatus {
    INITIATED,
    PENDING,     // ✅ added for booking → before payment
    SUCCESS,
    FAILED
}
