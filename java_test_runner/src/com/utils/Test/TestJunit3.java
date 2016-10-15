package com.utils.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import junit.framework.AssertionFailedError;
import junit.framework.TestResult;

public class TestJunit3 extends TestResult {
   // add the error
   public synchronized void addError(Test test, Throwable t) {
      super.addError((junit.framework.Test) test, t);
   }

   // add the failure
   public synchronized void addFailure(Test test, AssertionFailedError t) {
      super.addFailure((junit.framework.Test) test, t);
   }
	
   @Test
   public void testAdd1() {
      // add any test
	      //test data
	      int num = 5;


	      //check for false condition
	      assertFalse(num > 6);
	      
   }

   
   @Test
   public void testAdd2() {
      // add any test
	      //test data
	      String str = "Junit is working fineN";


	      //check for equality
	      assertEquals("Junit is working fine", str);

   }
   
   @Test
   public void testAddJLPO() {
      // add any test
	      //test data
	      String str = "Junit is working fineN";


	      //check for equality
	      assertEquals("Junit is working fine", str);

   }

   // Marks that the test run should stop.
   public synchronized void stop() {
      //stop the test here
   }
}