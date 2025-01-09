package com.konylabs.ffi;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Vector;
import com.konylabs.api.TableLib;
import com.konylabs.vm.LuaTable;



import com.konyffi.contacts.ContactPicker;
import com.konylabs.libintf.Library;
import com.konylabs.libintf.JSLibrary;
import com.konylabs.vm.LuaError;
import com.konylabs.vm.LuaNil;


public class N_contactsAPI extends JSLibrary {

 
	String[] methods = { };


 Library libs[] = null;
 public Library[] getClasses() {
 libs = new Library[1];
 libs[0] = new ContactPicker();
 return libs;
 }



	public N_contactsAPI(){
	}

	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		default:
			break;
		}
 
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "contactsAPI";
	}


	/*
	 * return should be status(0 and !0),address
	 */
 


class ContactPicker extends JSLibrary {

 
 
	public static final String selectSinglePhoneNumber = "selectSinglePhoneNumber";
 
 
	public static final String selectSingleEmail = "selectSingleEmail";
 
	String[] methods = { selectSinglePhoneNumber, selectSingleEmail };

	public Object createInstance(final Object[] params) {
 return new com.konyffi.contacts.ContactPicker(
 );
 }


	public Object[] execute(int index, Object[] params) {
		// TODO Auto-generated method stub
		Object[] ret = null;
 
		int paramLen = params.length;
 int inc = 1;
		switch (index) {
 		case 0:
 if (paramLen < 1 || paramLen > 2){ return new Object[] {new Double(100),"Invalid Params"};}
 inc = 1;
 
 com.konylabs.vm.Function callback0 = null;
 if(params[0+inc] != null && params[0+inc] != LuaNil.nil) {
 callback0 = (com.konylabs.vm.Function)params[0+inc];
 }
 ret = this.selectSinglePhoneNumber(params[0]
 ,callback0
 );
 
 			break;
 		case 1:
 if (paramLen < 1 || paramLen > 2){ return new Object[] {new Double(100),"Invalid Params"};}
 inc = 1;
 
 com.konylabs.vm.Function callback1 = null;
 if(params[0+inc] != null && params[0+inc] != LuaNil.nil) {
 callback1 = (com.konylabs.vm.Function)params[0+inc];
 }
 ret = this.selectSingleEmail(params[0]
 ,callback1
 );
 
 			break;
 		default:
			break;
		}
 
		return ret;
	}

	public String[] getMethods() {
		// TODO Auto-generated method stub
		return methods;
	}
	public String getNameSpace() {
		// TODO Auto-generated method stub
		return "ContactPicker";
	}

	/*
	 * return should be status(0 and !0),address
	 */
 
 
 	public final Object[] selectSinglePhoneNumber( Object self ,com.konylabs.vm.Function inputKey0
 ){
 
		Object[] ret = null;
 ((com.konyffi.contacts.ContactPicker)self).selectSinglePhoneNumber( (com.konylabs.vm.Function)inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
 
 	public final Object[] selectSingleEmail( Object self ,com.konylabs.vm.Function inputKey0
 ){
 
		Object[] ret = null;
 ((com.konyffi.contacts.ContactPicker)self).selectSingleEmail( (com.konylabs.vm.Function)inputKey0
 );
 
 ret = new Object[]{LuaNil.nil, new Double(0)};
 		return ret;
	}
 
}

};
