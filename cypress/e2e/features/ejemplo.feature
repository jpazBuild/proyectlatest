Feature: searching something in google

  Scenario Outline: Navigate google
    When I navegate into google
    When I search "<word>"
    
    Examples: 
      | word |
      | qa automation |
